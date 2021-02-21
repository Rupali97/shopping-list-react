import React, {useEffect} from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';



function App() {

  const [list, setList] = React.useState([
    {id: 1, title: "Item One", quantity: 3, isChecked: false}, 
    {id: 2, title: "Item Two", quantity: 7, isChecked: false},
    {id: 3, title: "Item Three", quantity: 1, isChecked: false},
  ])
  const [inputItem, setInputItem] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0)

  useEffect(() => {
    let count:number = 0;
    list.forEach(item => {
      count = count + item.quantity
    })
    setTotalCount(count);
  }, [list])

  const addItemToList = () => {
    setList([...list, {id: list.length + 1,title: inputItem, quantity: 1, isChecked: false}])
    setInputItem("")
  }

  const increseQuantity = (id: number) => {
    setList(list.map(item => (item.id === id ? {id: item.id, title: item.title, quantity: item.quantity === 0 ? 0 : item.quantity - 1, isChecked: item.isChecked} : item)))
  }

  const decreaseQuantity = (id: number) => {
    setList(list.map(item => (item.id === id ? {id: item.id, title: item.title, quantity: item.quantity + 1, isChecked: item.isChecked} : item)))
  }

  const handleCheck = (id: number) => {
    setList(list.map(item => (item.id === id ? {id: item.id, title: item.title, quantity: item.quantity, isChecked: !item.isChecked} : item)))
  }

  return (
  	<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputItem} onChange={(event) => setInputItem(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick={() => addItemToList()} />
				</div>
				<div className='item-list'>
					{list.map((item) => (
						<div className='item-container'>
							<div className='item-name' onClick={() => handleCheck(item.id)}>
								{item.isChecked ? (
									<>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.title}</span>
									</>
								) : (
									<>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.title}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => increseQuantity(item.id)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => decreaseQuantity(item.id)} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className='total'>Total: {totalCount}</div>
			</div>
		</div>
  );
}

export default App;
