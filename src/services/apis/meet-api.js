export class MeetApi{
    static get employees(){
        return fetch('http://localhost:1337/employees');
    };
};
