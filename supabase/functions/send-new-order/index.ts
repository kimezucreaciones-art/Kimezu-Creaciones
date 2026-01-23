import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderRequest {
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: any;
    items: any[];
    total: number;
    discount: number;
    finalTotal: number;
    paymentMethod: string;
    proofUrl: string;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const {
            orderId,
            customerName,
            customerEmail,
            customerPhone,
            address,
            items,
            total,
            discount,
            finalTotal,
            paymentMethod,
            proofUrl
        }: OrderRequest = await req.json();

        // Format items list HTML
        const itemsHtml = items.map((item: any) => `
      <li style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
        <strong>${item.name}</strong> x ${item.quantity} <br/>
        <span style="color: #666;">$${item.price.toLocaleString('es-CO')}</span>
      </li>
    `).join("");

        const addressHtml = `
      ${address.address} <br/>
      ${address.city}, ${address.department} <br/>
      ${address.notes || ''}
    `;

        const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2c3e50; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">¡Nuevo Pedido Recibido!</h1>
          <p style="margin: 10px 0 0;">Orden #${orderId.slice(0, 8)}</p>
        </div>

        <div style="padding: 20px;">
          <h2 style="color: #d35400;">Detalles del Cliente</h2>
          <p><strong>Nombre:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Teléfono:</strong> ${customerPhone}</p>
          <p><strong>Dirección de Envío:</strong><br/>${addressHtml}</p>

          <h2 style="color: #d35400; border-top: 1px solid #eee; padding-top: 20px;">Resumen de Compra</h2>
          <ul style="list-style: none; padding: 0;">
            ${itemsHtml}
          </ul>

          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="display: flex; justify-content: space-between; margin: 5px 0;">
              <span>Subtotal:</span>
              <strong>$${total.toLocaleString('es-CO')}</strong>
            </p>
            <p style="display: flex; justify-content: space-between; margin: 5px 0; color: #27ae60;">
              <span>Descuento:</span>
              <strong>-$${discount.toLocaleString('es-CO')}</strong>
            </p>
            <p style="display: flex; justify-content: space-between; margin: 10px 0; font-size: 1.2em; border-top: 2px dashed #ccc; padding-top: 10px;">
              <span>Total Pagado (${paymentMethod.toUpperCase()}):</span>
              <strong>$${finalTotal.toLocaleString('es-CO')}</strong>
            </p>
          </div>

          <h2 style="color: #d35400; border-top: 1px solid #eee; padding-top: 20px;">Comprobante de Pago</h2>
          <div style="text-align: center; margin: 20px 0;">
            <img src="${proofUrl}" alt="Comprobante de Pago" style="max-width: 100%; border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
            <p style="font-size: 0.8em; color: #888;">
              <a href="${proofUrl}" target="_blank">Ver imagen original a tamaño completo</a>
            </p>
          </div>
        </div>

        <div style="background-color: #eee; padding: 15px; text-align: center; font-size: 0.8em; color: #666;">
          Este es un mensaje automático de Kimezu Creaciones.
        </div>
      </div>
    `;

        // Send email to Admin
        const data = await resend.emails.send({
            from: "Kimezu Orders <onboarding@resend.dev>", // Or your custom domain
            to: ["kimezucreaciones@gmail.com"], // The admin email provided in git config (or changing to dynamic)
            subject: `[Nuevo Pedido] Orden #${orderId.slice(0, 8)} - $${finalTotal.toLocaleString('es-CO')}`,
            html: htmlContent,
        });

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
