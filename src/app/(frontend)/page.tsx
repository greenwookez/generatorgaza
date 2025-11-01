import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-[350px]">
      <Button>Default</Button>
      <Button size="sm">Small</Button>
      <Input placeholder="Type to search..." />
    </div>
  )
}
