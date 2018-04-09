// require(['underscore'])

(function () {


    var colors = {
        'red': 'red',
        'blue':'BRUE',
        'green':'GLEEN',
        'black': 'BRACK'
    };

    var input_data = { data:
            { name: 'asdf',
                location: 'Seattle',
                language: 'Java',
                message: '',
                submit: 'Send Message' },
        description: 'user data submission from the user form' };

    console.log(`keys in data`, Object.keys(input_data).length);
    console.log(`keys in data[0]`, Object.keys(input_data)[0].length);
    console.log(`keys in data[1]`, Object.keys(input_data)[1].length);



    for (var key in input_data) {
        console.log(`keys in object`, Object.keys(key).length);
        // skip loop if the property is from prototype
        if (!input_data.hasOwnProperty(key)) continue;
        console.log(input_data[key]);

        var obj = colors[key];

        for (var prop in obj) {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;

            // your code

            console.log(prop + " = " + obj[prop]);
        }
    }

    //
    // for (var key in colors) {
    //     // skip loop if the property is from prototype
    //     if (!colors.hasOwnProperty(key)) continue;
    //     console.log(colors[key]);
    //
    //     var obj = colors[key];
    //     for (var prop in obj) {
    //         // skip loop if the property is from prototype
    //         if(!obj.hasOwnProperty(prop)) continue;
    //
    //         // your code
    //
    //         console.log(prop + " = " + obj[prop]);
    //     }
    // }
    // var colors = ['red', 'blue', 'green', 'black'];
    //
    // // const map2 = color.map(x => x + "_color");
    //
    // const map1 = colors.map(x => x + "_color");


    // console.log(map1);
    // console.log(map2);


    // var mappedItems = _.map(colors, function (value, key, items) {
    //     //    value is the value of the particular item in the collection
    //     //    key is the thing we use to reference the item in the collection (in array it's index, in obejct it's prop name)
    //     //    items represents the original items passed in when we called map, can use the key combined with the list to get value
    //
    //     return String(value).toUpperCase();
    //
    // });

    // console.log(mappedItems);


}());