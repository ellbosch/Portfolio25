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
# Parameters: video_path, output_name, resolution_type (ipad|iphone|desktop)
generate_thumbnail() {
    local video_path="$1"
    local output_name="$2"
    local resolution_type="${3:-ipad}"  # default to ipad
    local output_path="$THUMBNAILS_DIR/${output_name}.jpg"

    echo -e "${BLUE}Generating thumbnail: ${output_name}.jpg (${resolution_type})${NC}"

    # Set scale based on device type
    local scale_filter
    case "$resolution_type" in
        ipad)
            # iPad videos: 1920x1080 (1080p)
            scale_filter="scale=1920:1080:force_original_aspect_ratio=decrease"
            ;;
        ipad-narrow)
            # iPad videos (narrow): 1545x1080 (exact dimensions, no aspect ratio preservation)
            scale_filter="scale=1545:1080"
            ;;
        iphone)
            # iPhone videos: 602x1310
            scale_filter="scale=602:1310:force_original_aspect_ratio=decrease"
            ;;
        desktop)
            # Desktop videos: Keep original but max 1920 width
            scale_filter="scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease"
            ;;
        *)
            # Fallback
            scale_filter="scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease"
            ;;
    esac

    # Extract frame at 0.5 seconds (to avoid black frames at start)
    # -q:v 2: high quality JPEG (1-31 scale, lower is better)
    ffmpeg -i "$video_path" \
        -ss 00:00:00.5 \
        -vframes 1 \
        -vf "$scale_filter" \
        -q:v 2 \
        "$output_path" \
        -y \
        -loglevel error 2>&1

    if [ $? -eq 0 ]; then
        # Get file size and dimensions
        local size=$(du -h "$output_path" | cut -f1)
        local dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$output_path")
        echo -e "${GREEN}✓ Created: ${output_name}.jpg (${size}, ${dimensions})${NC}"
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

# Stitch demo (iPad narrow - 1545x1080)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch-demo.mp4" "stitch-demo.mp4")
generate_thumbnail "$VIDEO_PATH" "stitch-demo" "ipad-narrow"

# Stitch AI rects (Desktop - 1080p)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/stitch_ai_rects.mp4" "stitch_ai_rects.mp4")
generate_thumbnail "$VIDEO_PATH" "stitch_ai_rects" "desktop"

# AR (iPad narrow - 1545x1080)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/AR.mp4" "AR.mp4")
generate_thumbnail "$VIDEO_PATH" "AR" "ipad-narrow"

# Object Detection (iPad - 1080p)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/object-detection.mp4" "object-detection.mp4")
generate_thumbnail "$VIDEO_PATH" "object-detection" "ipad"

# Humane (iPad - 1080p)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/humane.mp4" "humane.mp4")
generate_thumbnail "$VIDEO_PATH" "humane" "ipad"

# Monthly Stays (iPad - 1080p)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/monthly-stays.mp4" "monthly-stays.mp4")
generate_thumbnail "$VIDEO_PATH" "monthly-stays" "ipad"

# Redwoods (iPad - 1080p)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/redwoods.mp4" "redwoods.mp4")
generate_thumbnail "$VIDEO_PATH" "redwoods" "ipad"

# Earth (iPad - 1080p)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/earth.mp4" "earth.mp4")
generate_thumbnail "$VIDEO_PATH" "earth" "ipad"

# Vellum Feed (iPhone - 602x1310)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-feed-2.mp4" "vellum-feed-2.mp4")
generate_thumbnail "$VIDEO_PATH" "vellum-feed-2" "iphone"

# Vellum Edit (iPhone - 602x1310)
VIDEO_PATH=$(download_video "https://portfolio25-videos.s3.us-west-1.amazonaws.com/vellum-edit-downscaled.mov" "vellum-edit-downscaled.mov")
generate_thumbnail "$VIDEO_PATH" "vellum-edit-downscaled" "iphone"

# Local Video
echo -e "\n${BLUE}Processing local videos...${NC}"

# Lobe Train (keep existing - skip regeneration)
if [ -f "$THUMBNAILS_DIR/lobe-train.jpg" ]; then
    echo -e "${GREEN}✓ Skipping lobe-train.jpg (already exists)${NC}"
else
    if [ -f "$PROJECT_ROOT/src/assets/lobe-train.mp4" ]; then
        generate_thumbnail "$PROJECT_ROOT/src/assets/lobe-train.mp4" "lobe-train" "desktop"
    else
        echo -e "${RED}Warning: lobe-train.mp4 not found in assets${NC}"
    fi
fi

# Cleanup
echo -e "\n${BLUE}Cleaning up temporary files...${NC}"
rm -rf "$TEMP_DIR"

echo -e "\n${GREEN}✓ Thumbnail generation complete!${NC}"
echo -e "${BLUE}Thumbnails saved to: $THUMBNAILS_DIR${NC}"
echo -e "${BLUE}Total thumbnails created: $(ls -1 "$THUMBNAILS_DIR" | wc -l)${NC}"
