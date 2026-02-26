import { use } from "react"
import { TaskDetailView } from "@/components/task/task-detail-view"

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <TaskDetailView taskId={id} />
}
