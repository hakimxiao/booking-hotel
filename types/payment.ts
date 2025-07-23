export interface PaymentProps {
    // banyak response yang akan diberikan midtrans tapi kita mendeklarasikan yang dibutuhkkan saja
    transaction_status: string,
    payment_type? : string,
    fraud_status: string,
    status_code: string,
    gross_amount: string,
    signature_key: string,
    order_id: string
}