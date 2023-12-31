export interface User {
    uid: string;
    displayName: string;
    email: string;
    conferenceCode: string | null;
    ticketClass: string | null;
    paymentID: string | null;
    paymentTime: Date | null;
};

export interface Payment {
    amount: number;
    orderID: string;
    currency: string;
    payerID: string;
    paymentTime: Date | null;
    joinCode: string;
    uid: string;
};

export interface Conference {
    conferenceCode: string;
    conferenceName: string;
    prices?: Record<string, number>;
    registrants: number;
};