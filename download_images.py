
import os
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO

# Ensure directory exists
script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Script Directory: {script_dir}")
output_dir = os.path.join(script_dir, "public", "slideshow")
print(f"Output Directory: {output_dir}")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)
    print(f"Created directory: {output_dir}")

def download_image(url, filename, resize=None):
    try:
        save_path = os.path.join(output_dir, filename)
        if os.path.exists(save_path):
             print(f"Skipping {filename}, already exists at {save_path}")
             return Image.open(save_path)

        print(f"Downloading {filename} to {save_path}...")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        if resize:
            img = img.resize(resize)
        img.save(os.path.join(output_dir, filename))
        print(f"Saved {filename}")
        return img
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
        # Create a placeholder if download fails
        img = Image.new('RGB', (800, 600), color = (200, 200, 200))
        d = ImageDraw.Draw(img)
        d.text((10,10), f"Missing: {filename}", fill=(0,0,0))
        img.save(os.path.join(output_dir, filename))
        return img

def combine_images(img1_name, img2_name, output_name):
    try:
        img1 = Image.open(os.path.join(output_dir, img1_name))
        img2 = Image.open(os.path.join(output_dir, img2_name))
        
        # Resize to match height of img1
        img2 = img2.resize((int(img2.width * img1.height / img2.height), img1.height))
        
        # Create new image
        total_width = img1.width + img2.width
        new_img = Image.new('RGB', (total_width, img1.height))
        new_img.paste(img1, (0, 0))
        new_img.paste(img2, (img1.width, 0))
        
        new_img.save(os.path.join(output_dir, output_name))
        print(f"Created combined image {output_name}")
    except Exception as e:
        print(f"Failed to combine images for {output_name}: {e}")

# Image sources
images = {
    "old_town.jpg": "https://loremflickr.com/800/600/prague,square",
    "sprawl.jpg": "https://loremflickr.com/800/600/highway,traffic",
    "starbucks.jpg": "https://loremflickr.com/800/600/coffee,shop,interior",
    "parking.jpg": "https://loremflickr.com/800/600/empty,parking,lot",
    "digital_code_magnifying.png": "https://loremflickr.com/1280/720/code,matrix",
    "teens_on_phones.png": "https://loremflickr.com/1280/720/teenager,phone,night",
    "suburban_sprawl_aerial.png": "https://loremflickr.com/1280/720/suburb,aerial",
    "wow_gathering.png": "https://loremflickr.com/1280/720/warcraft,game",
    "introvert_extrovert_digital.png": "https://loremflickr.com/1280/720/computer,chat",
    "digital_bridge_art.png": "https://loremflickr.com/1280/720/bridge,neon,future",
    "surveillance_capitalism_book.png": "https://covers.openlibrary.org/b/id/8381666-L.jpg",
    "cortisol_graph.png": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Response_to_stress.jpg",
    "loneliness_chart.png": "https://loremflickr.com/1280/720/chart,graph" # Fallback generic
}

# Download all
for filename, url in images.items():
    download_image(url, filename)

# Combine comparisons
combine_images("old_town.jpg", "sprawl.jpg", "old_town_vs_sprawl.png")
combine_images("starbucks.jpg", "parking.jpg", "starbucks_vs_parking.png")
