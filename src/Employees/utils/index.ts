import { Role } from "../types";

export function validateRole(role: string): boolean {
    const validRoles: Role[] = ["manager", "stockAnalyst", "logisticsManager", "salesManager", "dataAnalyst"];
    return validRoles.includes(role as Role);
}