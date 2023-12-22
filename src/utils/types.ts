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
};

export interface Conference {
    conferenceCode: string;
    conferenceName: string;
    attendees: string[]; 
    prices?: Record<string, number>;
};

export interface Payment {
    amount: number;
    paymentTime: Date;
    joinCode: string;
    payerID: string;
    orderID: string;
};