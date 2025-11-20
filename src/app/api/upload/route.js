import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // From Vercel's documentation: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk
  // The filename is passed as a query parameter.
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json({ message: 'No filename or file body provided.' }, { status: 400 });
  }

  try {
    // The actual file content is in the request body.
    // 'put' uploads the file to Vercel Blob storage.
    const blob = await put(filename, request.body, {
      access: 'public', // Make the uploaded file publicly accessible.
    });

    // Return the blob details, which include the public URL.
    return NextResponse.json(blob);

  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json({ message: 'Error uploading file.', error: error.message }, { status: 500 });
  }
}
