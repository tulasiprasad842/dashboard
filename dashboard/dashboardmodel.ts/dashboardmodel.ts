export interface IdashBoard {
    Delivered: number;
    Incoming: number;
    Outgoing: number;
    Pending: number;
    PriorityId: number;
    PriorityName: string;
    UserId?: number;
    UserName?: string;
    DeptId?: number;
    DeptName?: string;
}




    export var single = [
        {
        "name": "monday",
        "value": 8940000
        },
        {
        "name": "tuesday",
        "value": 5000000
        },
        {
        "name": "wednessday",
        "value": 7200000
        }
       ];

export var multi=[
    {
        "name" : "campaign Manager",
        "series": [
            {
                "name" : "campaigns",
                "value": 450000
            },
            {
                "name" : "phonebook",
                "value" : 550000
            },
            {
                "name" : "Alerts Manager",
                "value" :  650000
            }
        ]
    },
    {
        name:"credits",
        series:[
            {
                "name":"platform",
                value: 200000
            },
            {
                "name" : "department",
                "value" : 300000
            },
            {
                "name" : "user",
                "value" :400000
            }
        ]
    },
    {
        "name" : "user Management",
        "series" : [
            {
                "name" : "Users",
                "value": 750000 
            },
            {
                "name" : "Departments",
                "value" :  850000
            },
            {
                "name" : "Groups",
                "value" : 950000
            }
        ]
    }
]
