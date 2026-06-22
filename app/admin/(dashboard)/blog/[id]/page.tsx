import { BlogForm } from "@/components/admin/BlogForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params
  return <BlogForm id={id} />
}
