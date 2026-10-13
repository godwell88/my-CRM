import { prisma } from "@/backend/db/prisma"
import type { Prisma } from "@/backend/generated/prisma/client"

export function createCustomer(data: Prisma.CustomerCreateInput) {
  return prisma.customer.create({ data })
}

export function listCustomers() {
  return prisma.customer.findMany({ orderBy: { createdAt: "desc" } })
}

export function findCustomerById(id: string) {
  return prisma.customer.findUnique({ where: { id } })
}
