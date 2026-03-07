    async function checkstatus() {
        const idInput = document.getElementById('studentID');
        const resultArea = document.getElementById('resultArea');

        if (!idInput || !idInput.value) {
            alert("እባክህ መለያ ቁጥር አስገባ!");
            return;
        }

        try {
            // እዚህ ጋር Backtick ( ' ) መጠቀሙን አረጋግጥ
            const response = await fetch(`http://127.0.0.1:3000/status/${idInput.value}`);
            const data = await response.json();

            if (response.ok) {
                // እዚህም Backtick (  ) የግድ ነው
            // resultArea.innerHTML የሚለውን ክፍል በዚህ ተካው
resultArea.innerHTML = `
    <div class="clearance-card">
        <h2>የተማሪ ክሊራንስ መረጃ</h2>
        <div class="info-row"><span>ስም (Name):</span> <span class="status-bold">${data.name}</span></div>
        <div class="info-row"><span>መታወቂያ (ID):</span> <span class="status-bold">${data.id}</span></div>
        <div class="info-row"><span>ላይብረሪ (Library):</span> <span style="color:${data.library === 'Cleared' ? 'green' : 'red'}">${data.library}</span></div>
        <div class="info-row"><span>ካፌ (Cafe):</span> <span style="color:${data.cafe === 'Cleared' ? 'green' : 'red'}">${data.cafe}</span></div>
        <div class="info-row"><span>ፋይናንስ (Finance):</span> <span class="status-bold">${data.finance}</span></div>
    </div>
`;
                resultArea.style.display = 'block';
            } else {
                alert("ተማሪው አልተገኘም!");
            }
        } catch (error) {
            alert("ስህተት፡ ሰርቨሩ አልተነሳም!");
        }
    }