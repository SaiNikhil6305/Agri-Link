import requests
import io
import zipfile

# S3 direct URL from Figshare
url = "https://ndownloader.figshare.com/files/40737164"

# Get total length
head = requests.head(url, allow_redirects=True)
total_size = int(head.headers.get('Content-Length', 0))
print(f"Total size: {total_size / (1024*1024):.2f} MB")

# Read last 512 KB to find End of Central Directory
tail_size = 512 * 1024
headers = {'Range': f'bytes={total_size - tail_size}-{total_size - 1}'}
r = requests.get(url, headers=headers, allow_redirects=True)

print(f"Fetched tail: {len(r.content)} bytes, status: {r.status_code}")
try:
    # Try reading as zip
    zf = zipfile.ZipFile(io.BytesIO(r.content))
    print("Files count in tail zip:", len(zf.namelist()))
    for name in zf.namelist()[:15]:
        print(" ", name)
except Exception as e:
    print("Direct tail parse info:", e)
