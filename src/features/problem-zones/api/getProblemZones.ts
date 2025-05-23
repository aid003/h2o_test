import { getOperations, GetOperationsParams } from "@/entities/operation/api/getOperations";
import { Operation } from "@/entities/operation/model/types";


/**
 * Возвращает все операции с amount > 10000.
 * Поддерживает оба варианта ответа: Array<Operation> или { data: Operation[] }.
 */
export async function fetchProblemZones(params: GetOperationsParams): Promise<Operation[]> {
  const res = await getOperations(["/api/operations", params]);
  const ops: Operation[] = Array.isArray(res) ? res : (res.data ?? []);
  return ops.filter(op => op.amount > 10000);
}
