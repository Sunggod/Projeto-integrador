export enum CartStatus {
    OPEN = "open",           // Carrinho aberto
    PENDING = "pending",     // Aguardando conclusão do checkout
    CHECKED_OUT = "checked_out", // Checkout concluído
    IN_PROCESS = "in_process",   // Pedido em processamento
    COMPLETED = "completed",     // Pedido concluído
    CANCELLED = "cancelled",     // Carrinho cancelado
    ABANDONED = "abandoned"      // Carrinho abandonado
}
