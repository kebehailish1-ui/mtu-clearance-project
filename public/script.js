document.getElementById('checkBtn').addEventListener('click', async () => {
    const id = document.getElementById('studentID').value;
    const resultArea = document.getElementById('resultArea');

    if (!id) {
        alert("እባክዎ መታወቂያ ያስገቡ!");
        return;
    }

    resultArea.innerHTML = "በመፈለግ ላይ...";
    resultArea.className = "show";

    try {
        // ከ Backend መረጃ መጠየቅ (Fetch)
        const response = await fetch(/status/${encodeURIComponent(id)});
        const data = await response.json();

        if (response.ok) {
            // መረጃው ሲገኝ HTML ገጹን ማዘመን (DOM Manipulation)
            resultArea.innerHTML = 
                <div class="result-card">
                    <p><strong>ተማሪ:</strong> ${data.StudentID}</p>
                    <p><strong>ላይብረሪ:</strong> <span class="${data.LibraryStatus.toLowerCase()}">${data.LibraryStatus}</span></p>
                    <p><strong>ካፌ:</strong> <span class="${data.CafeStatus.toLowerCase()}">${data.CafeStatus}</span></p>
                    <p><strong>ውሳኔ:</strong> ${data.LibraryStatus === 'Cleared' && data.CafeStatus === 'Cleared' ? '✅ ጨርሰዋል' : '❌ አልጨረሱም'}</p>
                </div>
            ;
        } else {
            resultArea.innerHTML = <p style="color:red;">${data.message}</p>;
        }
    } catch (error) {
        resultArea.innerHTML = "<p style="color:red;">ሰርቨሩ አልተገኘም! node src/app.js ማብራትዎን ያረጋግጡ።</p>";
    }
});