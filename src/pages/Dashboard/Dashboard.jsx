import React, { useState, useEffect } from 'react'

function Dashboard() {

    const [leetcodeData, setLeetCodeData] = useState({})

    useEffect(() => {
        fetch('https://leetcode-stats-api.herokuapp.com/mr_ankan2003')
        .then(response => response.json())
        .then(data => setLeetCodeData(data))
        .catch(error => console.error(error));
    }, []);

    console.log(leetcodeData)

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard