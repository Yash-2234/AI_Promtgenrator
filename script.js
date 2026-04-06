document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prompt-form');
    const outputSection = document.getElementById('output-section');
    const generatedPromptEl = document.getElementById('generated-prompt');
    const copyBtn = document.getElementById('copy-btn');
    const copyText = copyBtn.querySelector('.copy-text');
    const copyIcon = document.getElementById('copy-icon');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const topic = document.getElementById('topic').value.trim();
        const tone = document.getElementById('tone').value;
        const purpose = document.getElementById('purpose').value;
        const format = document.getElementById('format').value;

        // Generate the prompt
        let promptText = `Act as an expert in ${topic}. `;
        
        // Purpose mapping
        if (purpose === 'Explain') {
            promptText += `Explain the concept in a ${tone.toLowerCase()} tone. `;
        } else if (purpose === 'Summarize') {
            promptText += `Summarize the topic in a ${tone.toLowerCase()} tone. `;
        } else if (purpose === 'Analyze') {
            promptText += `Provide a detailed analysis in a ${tone.toLowerCase()} tone. `;
        } else if (purpose === 'Brainstorm') {
            promptText += `Brainstorm creative ideas in a ${tone.toLowerCase()} tone. `;
        } else if (purpose === 'Create') {
            promptText += `Create content about this in a ${tone.toLowerCase()} tone. `;
        }

        // Format mapping
        if (format === 'Bullet Points') {
            promptText += `Provide the output in bullet points with examples.`;
        } else if (format === 'Paragraphs') {
            promptText += `Provide the output in well-structured paragraphs with examples.`;
        } else if (format === 'Table') {
            promptText += `Provide the output in a structured table with examples.`;
        } else if (format === 'Code') {
            promptText += `Provide the output as code blocks with comments explaining the examples.`;
        } else if (format === 'Essay') {
            promptText += `Provide the output in an essay format with examples.`;
        }

        // Output the text
        generatedPromptEl.textContent = `"${promptText}"`;

        // Show the output section with animation
        outputSection.classList.remove('hidden');
        setTimeout(() => {
            outputSection.classList.add('visible');
        }, 10);
        
        // Reset copy button state
        resetCopyButton();
        
        // Smooth scroll to output
        setTimeout(() => {
            outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    copyBtn.addEventListener('click', async () => {
        let textToCopy = generatedPromptEl.textContent;
        // Strip quotes for clipboard content
        if (textToCopy.startsWith('"') && textToCopy.endsWith('"')) {
            textToCopy = textToCopy.substring(1, textToCopy.length - 1);
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Visual feedback
            copyBtn.classList.add('copied', 'copied-anim');
            copyText.textContent = 'Copied!';
            copyIcon.innerHTML = `<polyline points="20 6 9 17 4 12"></polyline>`;
            
            setTimeout(() => {
                copyBtn.classList.remove('copied-anim');
            }, 300);

            setTimeout(resetCopyButton, 2500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            copyText.textContent = 'Failed';
            setTimeout(resetCopyButton, 2000);
        }
    });

    function resetCopyButton() {
        copyBtn.classList.remove('copied');
        copyText.textContent = 'Copy';
        copyIcon.innerHTML = `<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>`;
    }
});
