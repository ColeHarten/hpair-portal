export interface User {
    uid: string;
    displayName: string;
    email: string;
    conferenceCode: string;
    ticketClass: string;
    paymentID: string;
};

export interface Payment {
    amount: number;
    orderID: string;
    currency: string;
    payerID: string;
    paymentTime: Date | undefined;
    joinCode: string;
};

export interface Conference {
    conferenceCode: string;
    conferenceName: string;
    attendees: string[]; 
    prices?: Record<string, number>;
};