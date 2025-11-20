#!/bin/bash

# Video Thumbnail Generation Script
# Generates JPEG thumbnails from video files for lazy loading placeholders

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
THUMBNAILS_DIR="$PROJECT_ROOT/src/assets/thumbnails"
TEMP_DIR="$PROJECT_ROOT/temp_videos"

echo -e "${BLUE}Starting video thumbnail generation...${NC}"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed.${NC}"
    echo "Install with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)"
    exit 1
fi

# Create temp directory for downloaded videos
mkdir -p "$TEMP_DIR"

# Function to generate thumbnail from video file
generate_thumbnail() {
    local video_path="$1"
    local output_name="$2"
    local output_path="$THUMBNAILS_DIR/${output_name}.jpg"

    echo -e "${BLUE}Generating thumbnail: ${output_name}.jpg${NC}"

    # Extract frame at 0.5 seconds (to avoid black frames at start)
    # -vf scale: resize while maintaining aspect ratio, max width 1280
    # -q:v 2: high quality JPEG (1-31 scale, lower is better)
    ffmpeg -i "$video_path" \
        -ss 00:00:00.5 \
        -vframes 1 \
        -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
        -q:v 2 \
        "$output_path" \
        -y \
        -loglevel error 2>&1

    if [ $? -eq 0 ]; then
        # Get file size
        local size=$(du -h "$output_path" | cut -f1)
        echo -e "${GREEN}✓ Created: ${output_name}.jpg (${size})${NC}"
    else
        echo -e "${RED}✗ Failed to create: ${output_name}.jpg${NC}"
    fi
}

# Function to download video from S3
download_video() {
    local url="$1"
    local filename="$2"
    local output_path="$TEMP_DIR/$filename"

    if [ -f "$output_path" ]; then
        echo "Using cached video: $filename" >&2
    else
        echo "Downloading: $url" >&2
        curl -s -o "$output_path" "$url"
    fi

    echo "$output_path"
}

echo -e "${BLUE}Creating thumbnails directory...${NC}"
mkdir -p "$THUMBNAILS_DIR"

# S3 Videos
echo -e "\n${BLUE}Processing S3-hosted videos...${NC}"

# Stitch demo
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch-demo.mp4" "stitch-demo.mp4")
generate_thumbnail "$VIDEO_PATH" "stitch-demo"

# Stitch AI rects
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch_ai_rects.mp4" "stitch_ai_rects.mp4")
generate_thumbnail "$VIDEO_PATH" "stitch_ai_rects"

# AR
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/AR.mp4" "AR.mp4")
generate_thumbnail "$VIDEO_PATH" "AR"

# Object Detection
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/object-detection.mp4" "object-detection.mp4")
generate_thumbnail "$VIDEO_PATH" "object-detection"

# Humane
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/humane.mp4" "humane.mp4")
generate_thumbnail "$VIDEO_PATH" "humane"

# Monthly Stays
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/monthly-stays.mp4" "monthly-stays.mp4")
generate_thumbnail "$VIDEO_PATH" "monthly-stays"

# Redwoods
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/redwoods.mp4" "redwoods.mp4")
generate_thumbnail "$VIDEO_PATH" "redwoods"

# Earth
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/earth.mp4" "earth.mp4")
generate_thumbnail "$VIDEO_PATH" "earth"

# Vellum Feed
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-feed-2.mp4" "vellum-feed-2.mp4")
generate_thumbnail "$VIDEO_PATH" "vellum-feed-2"

# Vellum Edit
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-edit-downscaled.mov" "vellum-edit-downscaled.mov")
generate_thumbnail "$VIDEO_PATH" "vellum-edit-downscaled"

# Local Video
echo -e "\n${BLUE}Processing local videos...${NC}"

# Lobe Train
if [ -f "$PROJECT_ROOT/src/assets/lobe-train.mp4" ]; then
    generate_thumbnail "$PROJECT_ROOT/src/assets/lobe-train.mp4" "lobe-train"
else
    echo -e "${RED}Warning: lobe-train.mp4 not found in assets${NC}"
fi

# Cleanup
echo -e "\n${BLUE}Cleaning up temporary files...${NC}"
rm -rf "$TEMP_DIR"

echo -e "\n${GREEN}✓ Thumbnail generation complete!${NC}"
echo -e "${BLUE}Thumbnails saved to: $THUMBNAILS_DIR${NC}"
echo -e "${BLUE}Total thumbnails created: $(ls -1 "$THUMBNAILS_DIR" | wc -l)${NC}"
