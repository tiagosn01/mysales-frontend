import { useAuth } from '@/contexts/AuthContext'
import { LogOut } from 'lucide-react'
import { Button } from '../Button'

export function Profile() {
  const { signOut, user } = useAuth()

  return (
    <div className="flex items-center gap-3">
      <img
        src="https://media.istockphoto.com/id/1337144146/pt/vetorial/default-avatar-profile-icon-vector.jpg?s=2048x2048&w=is&k=20&c=-h5YhX1ml6ixJXjKAeX_rnh4II4Ox6tzGTm-SU6tiF4="
        className="h-10 w-10 rounded-full"
        alt=""
      />
      <div className="flex flex-col">
        <span className="block text-sm font-semibold text-zinc-700 dark:text-zinc-100">
          {user.name}
        </span>
        <span className="block text-sm text-zinc-500 dark:text-zinc-400">
          {user.email}
        </span>
      </div>
      <Button
        variant="ghost"
        className="ml-auto"
        onClick={signOut}
        title="Sair"
      >
        <LogOut className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      </Button>
    </div>
  )
}
