// import React from 'react';

// // Home component displayed after successful login
// function Home({ currentUser, onLogout }) {
//   return (
//     <div className="text-center space-y-4">
//       <h2 className="text-3xl font-bold text-gray-800">Welcome, {currentUser}!</h2>
//       <p className="text-lg text-gray-600">You have successfully logged in.</p>
//       <button
//         onClick={onLogout}
//         className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Home;

import React from 'react';

function Home(){
    return(
        <h2 style={{textAlign:'center'}}>Welcome to Job Portal Application!!!</h2>
    )
}

export default Home;