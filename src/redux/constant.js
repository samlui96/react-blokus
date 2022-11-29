
const TETROMINOS = [
    {
        'F': [
            [0,0,0,0,0],
            [0,0,1,1,0],
            [0,1,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0]
        ],
        'I': [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [1,1,1,1,1],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        'L': [
            [0,0,0,0,0],
            [0,1,0,0,0],
            [0,1,1,1,1],
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        'N': [
            [0,0,0,0,0],
            [0,1,1,0,0],
            [0,0,1,1,1],            
            [0,0,0,0,0],
            [0,0,0,0,0]
        ],
        'P': [
            [1,1,1],
            [1,1,0],
            [0,0,0]
        ],
        'T': [
            [1,1,1],
            [0,1,0],
            [0,1,0]
        ],
        'U': [
            [1,0,1],
            [1,1,1],
            [0,0,0]
        ],
        'V': [
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ],
        'W': [
            [0,0,1],
            [1,1,1],
            [1,0,0]
        ],
        'X': [
            [0,1,0],
            [1,1,1],
            [0,1,0]
        ],
        'Y': [
            [0,1,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ],
        'Z': [
            [1,1,0],
            [0,1,0],
            [0,1,1]
        ],
    },
    // {
    //     'I': [
    //         [0,0,0,0],
    //         [1,1,1,1],
    //         [0,0,0,0],
    //         [0,0,0,0]
    //     ],
    //     'L': [
    //         [1,0,0],
    //         [1,1,1],
    //         [0,0,0]
    //     ],
    //     'N': [
    //         [1,1,0],
    //         [0,1,1],
    //         [0,0,0]
    //     ],
    //     'O': [
    //         [1,1],
    //         [1,1]
    //     ],
    //     'T': [
    //         [1,1,1],
    //         [0,1,0],
    //         [0,0,0],
    //     ],
    // },
    // {
    //     'I': [
    //         [0,0,0],
    //         [1,1,1],
    //         [0,0,0]
    //     ],
    //     'L': [
    //         [1,0,0],
    //         [1,1,1],
    //         [0,0,0]
    //     ]
    // },
    // {
    //     'I': [
    //         [0,0],
    //         [1,1]
    //     ],
    // },
    // {
    //     'I': [
    //         [1]
    //     ],
    // }
];

export default TETROMINOS;