import urllib.request
import os

xml_url = "https://ndownloader.figshare.com/files/40763588"
target_xml = "maize.xml"

if not os.path.exists(target_xml):
    print("Downloading maize.xml (5 MB)...")
    urllib.request.urlretrieve(xml_url, target_xml)
    print("Downloaded maize.xml successfully.")

print("Inspecting first 50 lines of maize.xml:")
with open(target_xml, "r", encoding="utf-8", errors="ignore") as f:
    for i in range(50):
        line = f.readline()
        if not line: break
        print(line.strip())
