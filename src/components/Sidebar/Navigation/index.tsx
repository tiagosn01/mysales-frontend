import {
  Home,
  BarChart,
  SquareStack,
  CheckSquare,
  Flag,
  Users,
} from 'lucide-react'

import { NavItem } from './NavItem'

export function Navigation() {
  return (
    <nav className="flex flex-col gap-0.5">
      <NavItem icon={Home} title="Home" path="/" />
      <NavItem icon={BarChart} title="Vendas" path="/sales" />
      <NavItem icon={SquareStack} title="Clientes" path="/clients" />
    </nav>
  )
}
