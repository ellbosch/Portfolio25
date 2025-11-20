#!/bin/bash

# Resume S3 Bucket Setup Script
# This script creates an S3 bucket and uploads your resume with private access

set -e  # Exit on any error

# Configuration
BUCKET_NAME="elliotboschwitz-portfolio-resume"
REGION="us-west-1"
RESUME_FILE="resume.pdf"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "======================================"
echo "Resume S3 Bucket Setup"
echo "======================================"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}Error: AWS credentials not configured${NC}"
    echo "Run: aws configure"
    exit 1
fi

echo -e "${GREEN}✓${NC} AWS CLI is configured"
echo ""

# Prompt for resume file location
echo "Where is your resume PDF located?"
echo -e "${YELLOW}Default: ./src/assets/resume.pdf${NC}"
read -p "Enter path (or press Enter for default): " RESUME_PATH

if [ -z "$RESUME_PATH" ]; then
    RESUME_PATH="./src/assets/resume.pdf"
fi

# Check if resume file exists
if [ ! -f "$RESUME_PATH" ]; then
    echo -e "${RED}Error: Resume file not found at: $RESUME_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Found resume at: $RESUME_PATH"
echo ""

# Prompt for bucket name
echo "What should the S3 bucket be called?"
echo -e "${YELLOW}Default: $BUCKET_NAME${NC}"
read -p "Enter bucket name (or press Enter for default): " USER_BUCKET

if [ -n "$USER_BUCKET" ]; then
    BUCKET_NAME="$USER_BUCKET"
fi

echo ""
echo "======================================"
echo "Configuration:"
echo "  Bucket: $BUCKET_NAME"
echo "  Region: $REGION"
echo "  Resume: $RESUME_PATH"
echo "======================================"
echo ""

read -p "Proceed with setup? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "Setting up S3 bucket..."
echo ""

# Check if bucket already exists
if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    # Bucket doesn't exist, create it
    echo "→ Creating bucket: $BUCKET_NAME"

    if [ "$REGION" == "us-east-1" ]; then
        # us-east-1 doesn't need LocationConstraint
        aws s3api create-bucket \
            --bucket "$BUCKET_NAME" \
            --region "$REGION"
    else
        # Other regions require LocationConstraint
        aws s3api create-bucket \
            --bucket "$BUCKET_NAME" \
            --region "$REGION" \
            --create-bucket-configuration LocationConstraint="$REGION"
    fi

    echo -e "${GREEN}✓${NC} Bucket created"
else
    echo -e "${YELLOW}⚠${NC} Bucket already exists (skipping creation)"
fi

# Block all public access
echo "→ Blocking public access"
aws s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
        "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
echo -e "${GREEN}✓${NC} Public access blocked"

# Upload resume with private ACL
echo "→ Uploading resume: $RESUME_FILE"
aws s3 cp "$RESUME_PATH" "s3://$BUCKET_NAME/$RESUME_FILE" \
    --acl private \
    --content-type "application/pdf"
echo -e "${GREEN}✓${NC} Resume uploaded"

# Verify upload
echo "→ Verifying upload"
if aws s3 ls "s3://$BUCKET_NAME/$RESUME_FILE" &> /dev/null; then
    echo -e "${GREEN}✓${NC} Resume verified in bucket"
else
    echo -e "${RED}✗${NC} Upload verification failed"
    exit 1
fi

# Test that public access is blocked
echo "→ Testing public access is blocked"
PUBLIC_URL="https://$BUCKET_NAME.s3.$REGION.amazonaws.com/$RESUME_FILE"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PUBLIC_URL")

if [ "$HTTP_CODE" == "403" ] || [ "$HTTP_CODE" == "404" ]; then
    echo -e "${GREEN}✓${NC} Public access correctly blocked (HTTP $HTTP_CODE)"
else
    echo -e "${YELLOW}⚠${NC} Warning: Got HTTP $HTTP_CODE (expected 403)"
fi

echo ""
echo "======================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Set these environment variables in AWS Amplify Console:"
echo ""
echo "   Backend Variables (Lambda):"
echo "   - S3_BUCKET_NAME = $BUCKET_NAME"
echo "   - AWS_REGION = $REGION"
echo "   - RESUME_S3_KEY = $RESUME_FILE"
echo ""
echo "2. Make sure Lambda has IAM permissions to read from this bucket"
echo ""
echo "3. See DEPLOYMENT.md for complete setup instructions"
echo ""

# Output bucket info
echo "Bucket details:"
aws s3 ls "s3://$BUCKET_NAME" --human-readable --summarize

echo ""
echo -e "${GREEN}Done!${NC}"
