import { supabaseAdmin } from "./supabase/admin"

export type StorageBucket = "project-images" | "blog-covers" | "assets"

export async function uploadFile(
  file: File,
  bucket: StorageBucket,
  path: string
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`)
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl
}

export async function deleteFile(
  bucket: StorageBucket,
  path: string
): Promise<void> {
  const { error } = await supabaseAdmin.storage.from(bucket).remove([path])
  if (error) {
    throw new Error(`Supabase delete failed: ${error.message}`)
  }
}

export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)
  return publicUrl
}
