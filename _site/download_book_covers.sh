#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p assets/images/books

# Function to download a book cover
download_cover() {
    local title=$1
    local url=$2
    local filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g').jpg
    echo "Downloading $title..."
    curl -L "$url" -o "assets/images/books/$filename"
}

# Download covers for each book
download_cover "Waves in an Impossible Sea" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "A Primate's Memoir" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Thinking in Systems" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Hands-On Data Structures and Algorithms with Python" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Atomic Habits" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Ultra-learning" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "When" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Gene Machine" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Range" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Possible Minds" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "The Accidental Mind" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Understanding the Brain" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Deep Work" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Kinds Of Minds" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "In Praise of Wasting Time" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "The Age of Insight" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Reductionism in Art and Brain Science" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Reclaim Your Brain" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Conscious" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "Healing Back Pain" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "The Spirit of Kaizen" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"
download_cover "The Nature Fix" "https://images-na.ssl-images-amazon.com/images/I/41V5EGttHKL._SX329_BO1,204,203,200_.jpg"

echo "All book covers downloaded!" 