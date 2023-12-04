import httpx
import asyncio


async def zip_upload():
    async with httpx.AsyncClient() as client:
        files = {'file': open('file.txt', 'rb')}
        r = await client.post('http://localhost:3000/zip', files=files)
        print(r.json())


async def normal():
    async with httpx.AsyncClient() as client:
        data = {'hello': 'world'}
        r = await client.post('http://localhost:3000', data=data)
        print(r.json())


# generator
async def uploadByStream():
    async with httpx.AsyncClient() as client:
        async with client.stream('POST', 'http://localhost:3000/zip', headers={'Content-type': 'multipart/form-data; boundary=-----x'}) as r:
            async for chunk in r.aiter_bytes():
                print(chunk)


async def main():
    await uploadByStream()


asyncio.run(main())
