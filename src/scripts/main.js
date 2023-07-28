'use strict';

function createMessage(text, isError = false) {
  const messageDiv = document.createElement('div');

  messageDiv.dataset.qa = 'notification';

  if (!isError) {
    messageDiv.classList.add('success');
  } else {
    messageDiv.classList.add('warning');
  }

  messageDiv.textContent = text;
  document.body.appendChild(messageDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function() {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', function() {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = true;

  document.addEventListener('click', function() {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', function() {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((success) => {
  createMessage(success);
})
  .catch((error) => {
    createMessage(error, true);
  });

secondPromise.then((result) => {
  createMessage(result);
}).catch((error) => {
  createMessage(error.message, true);
});

thirdPromise.then((message) => {
  createMessage(message);
}).catch((error) => {
  createMessage(error.message, true);
});
