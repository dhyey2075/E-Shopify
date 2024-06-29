import sendEmail from '@/app/utils/sendEmail'; // Adjust the path as per your project structure
import { NextResponse } from 'next/server';

export async function POST(reqq, res) {
    const req = await reqq.json();
    console.log(req);
    if (true) { // You had `if (1===1)` which will always be true
        const { email, order } = req;
        try {
            await sendEmail(email, 'Order Confirmation', formatEmailContent(order));
            return NextResponse.json({ message: 'Email sent successfully' }); // Return the response here
        } catch (error) {
            console.error('Error sending email:', error);
            return NextResponse.json({ error: 'Error sending email' }); // Return the error response here
        }
    } else {
        return NextResponse.json({ error: 'Invalid request method'}); // Return the response here
    }
}
function formatEmailContent(order) {
    return `Your Order with:
    Email: ${order.email}
    Product ID: ${order.products[0].productID}
    Quantity: ${order.products[0].quantity}
    Total Price: ${parseInt(order.products[0].price) * parseInt(order.products[0].quantity)}
    Payment Method: ${order.paymentMethod}\n\n\n
    Order will be delivered soon on: 
    Street: ${order.shippingAddress.street}
    City: ${order.shippingAddress.city}
    State: ${order.shippingAddress.state}
    Pincode: ${order.shippingAddress.postalCode}
    Country: ${order.shippingAddress.country}\n\n\n
    Thank you for shopping with E-shopify. Have a nice day!`;
}
