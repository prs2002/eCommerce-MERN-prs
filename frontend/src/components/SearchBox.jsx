import { useEffect, useRef, useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  // add suggestions first and then add debounce
  const [keyword, setKeyword] = useState(urlKeyword || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

    useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // Replace this with your actual API call
      fetch(`/api/products?keyword=${keyword}`)
        .then((res) => res.json())
        .then((data) => {
          const names = data.products.map(p => p.name);
          setSuggestions(names || []);
          setShowSuggestions(true);
        })
        .catch(() => {
          setSuggestions([]);
          setShowSuggestions(false);
        });
    }, 300); // debounce timeout
  }, [keyword]);


  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
        setKeyword('');
      navigate(`/search/${keyword.trim()}`);
        
      setShowSuggestions(false);

      setKeyword('');
    } else {
      navigate('/');
    }
  };

  const selectSuggestion = (suggestion) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
    navigate(`/search/${suggestion}`);
      setSuggestions([]);
  };

  return (
    <div>    
      <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2 mx-2'>
          Search
        </Button>
      </Form>
        <div style={{ position: 'relative', width: '80%' }}> 
        {showSuggestions && suggestions.length > 0 && (
        <ListGroup style={{
          position: 'absolute',
          top: '100%',
          zIndex: 1000,
          width: '100%',
          maxHeight: '200px',
          overflowY: 'auto',
        }}>
          {suggestions.map((item, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => selectSuggestion(item)}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
    </div>
  );
};

export default SearchBox;
