// Quick test to check if backend returns imageUrl
const testAnswers = [
  { questionId: 1, choice: "I seek wisdom in solitude" },
  { questionId: 2, choice: "The moon calls to my spirit" },
  { questionId: 3, choice: "I protect those I love" }
];

fetch('http://localhost:3001/api/consult-oracle', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ answers: testAnswers })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Backend Response:');
  console.log(JSON.stringify(data, null, 2));
  console.log('\n📸 Image URL present:', !!data.spiritAnimal?.imageUrl);
  console.log('📸 Image URL length:', data.spiritAnimal?.imageUrl?.length || 0);
  if (data.spiritAnimal?.imageUrl) {
    console.log('📸 Image URL starts with:', data.spiritAnimal.imageUrl.substring(0, 50));
  }
})
.catch(err => console.error('❌ Error:', err));
