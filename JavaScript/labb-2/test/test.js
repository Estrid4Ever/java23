

const fetchData = jest.fn();
const setDaySpecialContent = jest.fn();

const document = global.document
   
const renderSpecial = require("../src/script/app");

let currentDayIndex = new Date('2024-09-16T12:00:00Z');

const mockSpecialsData = {
    "weeklySpecialsMenu": {
        "Monday": [
            {
                "name": "BBQ Revben",
                "price": 108.0,
                "description": "Långkokta revben med BBQ-sås",
                "time": "11:00-14:00"
            },
            {
                "name": "Grillad Kyckling",
                "price": 135.0,
                "description": "Marinerad kycklingbröst grillad till perfektion",
                "time": "17:00-20:00"
            }
        ],
        "Tuesday": [
            {
                "name": "Biff",
                "price": 171.0,
                "description": "Saftig biff med vitlökssmör",
                "time": "11:00-14:00"
            },
            {
                "name": "Grillad Lax",
                "price": 162.0,
                "description": "Laxfilé med citron och örter",
                "time": "17:00-20:00"
            }
        ]
    }
};
 

describe('renderRelevantSpecal', () => {
    beforeEach(() => {
        fetchData.mockResolvedValue(mockSpecialsData);
    });

    it('renders Monday lunch special', async () => {
        currentDayIndex.setHours(12);
        await renderSpecial(16);

        expect(setDaySpecialContent).toHaveBeenCalledWith(0, "Lunch", "Monday", mockSpecialsData.weeklySpecialsMenu);
    });

    it('renders Tuesday dinner special', async () => {
        currentDayIndex.setHours(17);
        await renderSpecial(17);

        expect(setDaySpecialContent).toHaveBeenCalledWith(1, "Middag", "Tuesday", mockSpecialsData.weeklySpecialsMenu);
    });

});
