import { ProjectForm } from "@/components/admin/ProjectForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  return <ProjectForm id={id} />
}
