export interface addUserPayload{
    emailId:string;
    firstName: string;
    lastName: string;
    contactNo: string;
    address: string;
    title: string;
    allowedEmailCount: string;
    assignBy: string;
    roleIds: number[]
}