pip install fastapi uvicorn transformers torch librosa
pip install pydub

- Go to the official ffmpeg download page: https://ffmpeg.org/download.html
- Under "Get packages & executable files," click on "Windows"
- I recommend using the builds from gyan.dev or BtbN. Click on one of these links.
- Download the "ffmpeg-release-essentials" package (usually a zip file)
- Extract the zip file to a location on your computer (e.g., C:\ffmpeg)
- Add the bin folder to your system PATH

Open terminal from emotion-backend and run:
uvicorn app.main:app --host 0.0.0.0 --port 8000

Open terminal from emotion-testing\app and run:
npm run dev