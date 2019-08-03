const MockupJSON = {
    "loadedUser": {
        "id": "1",
        "name": "Ivan",
        "surname": "Kolev",
        "conversations": [{
            "topic": "bager1",
            "correspondent": "Petko",
            messages: [{
                "date": "2019-08-01 12:00:00",
                "from": "Petko",
                "content": "Svoboden li e bagera"
            }, {"date": "2019-08-01 12:00:00", "from": "me", "content": "Da svoboden e zapovqdai !"}]
        },
            {
                "topic": "bager2",
                "correspondent": "Mihail",
                messages: [{
                    "date": "2019-08-01 12:00:00",
                    "from": "Petko",
                    "content": "Prodava li se bagera bagera"
                }, {"date": "2019-08-01 12:00:00", "from": "me", "content": "Da plashtash i e tvoi"}]
            },
            {
                "topic": "bager3",
                "correspondent": "Dimitar",
                messages: [{
                    "date": "2019-08-01 12:00:00",
                    "from": "Petko",
                    "content": "shte moje li da vzema bagera"
                }, {"date": "2019-08-01 12:00:00", "from": "me", "content": "Da  zapovqdai !"}]
            }],
        "machinesForRent": [{
            "id": "1",
            "name": "Bager 1 Bobcat",
            "description": "bagera e s malka kofa",
            "price": "100",
            "events": [{"id":"1", "date":"2019:08:14"}]
        }, {
            "id": "1",
            "name": "Bager 2 Komatsu", "description": "bagera e s golqma kofa",
            "price": "300",
            "events": [{"id":"2", "date":"2019:08:15"}]
        }],
        "offeringServices": [{
            "id": "1",
            "description": "dupki na konkurentni ceni",
            "name": "Kopaq duppki",
            "events": [{"id":"3", "date":"2019:08:17"}]
        }, {
            "id": "1",
            "description": "imam bager s chuk i razkurtvam monolitni sgradi",
            "name": "Kyrtq beton s bager s chuk",
            "events": [{"id":"4", "date":"2019:08:18"}]
        }],

        "projectRequests": [{
            "id": "1",
            "name": "Lepene na tapet",
            "description": "Imam nujda nqkoi da zalepi tapeti na 20 kvadrata staq",
            "priceRange": "100",
            "events": [{"id":"5", "date":"2019:08:12"}, {"id":"6", "date":"2019:08:12"}]

        }, {
            "id": "2",
            "name": "Boqdisvane s Lateks",
            "description": "Imam nujda nqkoi da mi boqdisa hola, koito e 20 kvadrata staq",
            "priceRange": "50",
            "events": [{"id":"4", "date":"2019:08:11"}]
        }]
    },

    "foundOffers": [{
        "id": "1",
        "name": "chistene na kumini",
        "price": "200",
        "description": "Chistim kumini i pokrivi i uluci na nai izgodni ceni",
        "from": {"id": "2", "name": "Kiril"},
        "phone": "0988933188",
        "image": "https://apollo-frankfurt.akamaized.net/v1/files/2ks51kr7ay341-BG/image;s=80x60"
    }, {
        "id": "2",
        "name": "smqna na keremidi",
        "price": "300",
        "description": "smenqm keremidi na dobri ceni",
        "from": {"id": "3", "name": "Marin"},
        "phone": "0988933188",
        "image": "https://apollo-frankfurt.akamaized.net/v1/files/88ilwu50lboj3-BG/image;s=59x46"
    }, {
        "id": "3",
        "name": "Shpaklovki vsqkakvi",
        "price": "30",
        "description": "shpakolvki na dobri ceni",
        "from": {"id": "4", "name": "Marin"},
        "phone": "0988933188",
        "image": "https://apollo-frankfurt.akamaized.net/v1/files/z8etlas8lepb1-BG/image;s=59x46"
    }]


};


export default MockupJSON;