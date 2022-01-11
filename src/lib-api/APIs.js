export const addNewQuote = async quote => {
  const response = await fetch(
    'https://quotes-2cb8b-default-rtdb.firebaseio.com/quotes.json',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(quote),
    }
  );
  if (!response.ok) {
    throw new Error('faild to send data');
  }
  const data = response.json();
  return true;
};

export const getAllQuotes = async () => {
  const response = await fetch(
    'https://quotes-2cb8b-default-rtdb.firebaseio.com/quotes.json'
  );
  if (!response.ok) {
    throw new Error('faild to fetch data');
  }
  const data = await response.json();
  const quotes = [];
  for (let key in data) {
    const quote = {
      id: key,
      ...data[key],
    };
    quotes.push(quote);
  }
  return quotes;
};

export const getSingleQoute = async id => {
  const response = await fetch(
    `https://quotes-2cb8b-default-rtdb.firebaseio.com/quotes/${id}.json`
  );
  if (!response.ok) {
    throw new Error('faild to fetch data');
  }
  const data = await response.json();
  let quote;
  for (let key in data) {
    quote = {
      id: id,
      name: data.name,
      text: data.text,
    };
  }
  return quote;
};

export const addNewComment = async requestData => {
  const response = await fetch(
    `https://quotes-2cb8b-default-rtdb.firebaseio.com/comments/${requestData.id}.json`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: requestData.text }),
    }
  );
  if (!response.ok) {
    throw new Error('faild to send data');
  }
  return true;
};

export const getAllComments = async id => {
  const response = await fetch(
    `https://quotes-2cb8b-default-rtdb.firebaseio.com/comments/${id}.json`
  );
  if (!response.ok) {
    throw new Error('faild to fetch data');
  }
  const data = await response.json();
  const comments = [];
  for (let key in data) {
    const comment = {
      id: key,
      text: data[key].text,
    };
    comments.push(comment);
  }
  return comments;
};

export const removeSingleComment = async requestData => {
  const response = await fetch(
    `https://quotes-2cb8b-default-rtdb.firebaseio.com/comments/${requestData.id}/${requestData.commentId}.json`,
    {
      method: 'DELETE',
    }
  );
  if (!response.ok) {
    throw new Error('faild to send data');
  }
  return true;
};
