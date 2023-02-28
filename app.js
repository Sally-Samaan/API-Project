async function fetchApi(country) {
    try {
      const url = `https://restcountries.com/v3.1/name/${country}`;
      const response = await fetch(url);
      const data = await response.json();
      const filteredData = data.filter(item => item.name.common.toLowerCase().includes(country.toLowerCase()));
      return filteredData;
    } catch (error) {
      console.log(error);
    }
  }
  
  const numberToRGB = num => {
    const r = Math.floor(num / 65536) % 256;
    const g = Math.floor(num / 256) % 256;
    const b = num % 256;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function Countries() {
    const input = document.getElementById('searchBar');
    input.addEventListener('keydown', async (event) => {
      if (event.key === "Enter") {
        const country = input.value.trim();
        if (country.length === 0) return;
  
        const data = await fetchApi(country);
        data.forEach(countryData => {
          const population = countryData.population;
          const area = countryData.area;
          const borders = countryData.borders || [] ;
          const bordersLength = borders.length;
  
          const populationColor = numberToRGB(population);
          const areaColor = numberToRGB(area);
  
          let borderLines = '';
          for (let i = 0; i < bordersLength; i++) {
            const randomAngle = Math.floor(Math.random() * 360);
            const randomColor = numberToRGB(Math.floor(Math.random() * 16777215));
            borderLines += `linear-gradient(${randomAngle}deg, transparent, ${randomColor}), `;
          }
          borderLines = borderLines.slice(0, -2); // remove the extra comma and space at the end
          
          const boardersContainer = document.getElementById('boarders');
          boardersContainer.innerHTML = ''; // clear any existing border lines
          
          for (let i = 0; i < bordersLength; i++) {
            const line = document.createElement('div');
            line.classList.add('border-line');
            const color = numberToRGB(Math.floor(Math.random() * 16777216));
            line.style.borderColor = color;
            line.style.transform = `rotateZ(${Math.floor(Math.random() * 360)}deg)`; // set the random rotation angle
            boardersContainer.appendChild(line);
          }
          
  
          document.body.style.backgroundImage = `radial-gradient(circle, ${areaColor}, ${populationColor}), ${borderLines}`;
        });
      }
    });
  }

Countries();