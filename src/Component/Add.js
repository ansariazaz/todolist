import React, { useState, useEffect } from 'react'


const cocktail = ['Malta', 'Sonfee', 'Santra'];
const getLocalData = () => {
    const data = localStorage.getItem("list");
    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
};
const Add = () => {

    const [values, setValues] = useState({
        name: '', cocktail: '', point: ''
    });

    const [item, setItem] = useState(getLocalData());
    const [edit, setEdit] = useState();

    const [isEdit, setIsEdit] = useState(false);

    const [sumData, setSumData] = useState({'Malta':0,'Sonfee':0, 'Santra':0});

    useEffect(()=>{
        let malta = sumValue('Malta')
        let sonfe = sumValue('Sonfee')
        let santra = sumValue('Santra')

        setSumData({'Malta':malta,'Sonfee':sonfe, 'Santra':santra})

    }, [item])

    const addItem = () => {
        if (!values) {
            alert("plz add  items first");
        }
        else if (isEdit) {
            const updatedValue = item.filter((ele) => {
                return ele.id !== edit;
            })
            if (values.name.length && values.cocktail.length && values.point.length) {
                setItem([...updatedValue, { id: edit, name: values }]);
                setIsEdit(false)
            }
        }
        else {

            if (values.name.length && values.cocktail.length && values.point.length) {
                const newValue = {
                    id: new Date().getTime().toString(),
                    name: values,
                }
                setItem([...item, newValue]);
                setValues({ name: '', cocktail: '', point: '' });
            }
            else {
                alert("Data is missing")
            }
        }
    }

    function sumValue(cocktail) {

        let selectedCockTail = item.filter(data=>data.name.cocktail == cocktail)

        let sum = 0;
        for (let i = 0; i < selectedCockTail.length; i++) {
            sum = sum + parseInt(selectedCockTail[i].name.point)
        }

        console.log(sum)

        return sum;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const resetItem = () => {
        setValues({ name: '', cocktail: '', point: '' });
    }
    const deleteItem = (index) => {
        const updatedValue = item.filter((ele) => {
            return ele.id !== index;
        })
        setItem(updatedValue);
    }
    const editItem = (index) => {
        const edited = item.find((ele) => {
            return ele.id === index;
        });
        setValues(edited.name);
        setIsEdit(true)

        setEdit(index);

    }
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(item))
    }, [item])

    return (

        <div className="container">
            <form className="add-section" onSubmit={handleSubmit}>
                <h1 className="add">Add Entry</h1>

                <div className="form">
                    <label>Name</label>
                    <input type="text" placeholder="Enter your Name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} required />
                </div>

                <div className="form">
                    <label for="">Select cocktail</label>
                    <select value={values.cocktail} onChange={(e) => setValues({ ...values, cocktail: e.target.value })} required>
                        <option value="" disabled>Please select</option>
                        {cocktail.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>

                <div className="form">
                    <label>Point ( 0 to 10 )</label>
                    <input type="number" placeholder="Give points" value={values.point} onChange={(e) => setValues({ ...values, point: e.target.value })} required></input>
                </div>
                <div className="btn">
                    <button onClick={resetItem}>Reset</button>
                    <button className="color-btn" onClick={addItem} >{isEdit ? 'Upadate' : 'Add'}</button>
                </div>
            </form>
            <div className="entry-section">
                <h1 className="entry">Entries</h1>
                <span>#1 Malta({sumData['Malta']})</span>
                <span>#2 Sönfee({sumData['Sonfee']})</span>
                <span>#3 Santrá({sumData['Santra']})</span>
                <div className="entry-head">
                    <p>Name</p>
                    <p>Cocktail</p>
                    <p>Given point</p>
                    <p>Action</p>
                </div>
                <div className="entry-list">
                    {item.map((ele) => {
                        return (
                            <div className="items" key={ele.id}>
                                <div className="item-list">
                                    <p>{ele.name.name}</p>
                                    <p>{ele.name.cocktail}</p>
                                    <p>{ele.name.point}</p>
                                    <div className="btn1">
                                        <button onClick={() => { editItem(ele.id) }}>Edit</button>
                                        <button onClick={() => { deleteItem(ele.id) }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Add;
