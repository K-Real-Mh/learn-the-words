import React from 'react';
import HeaderBlock from './components/HeaderBlock';
import ContentBlock from './components/ContentBlock';
import FooterBlock from './components/FooterBlock';

const App = () => {
	return (
		<>
			<HeaderBlock title="Учите слова онлайн" />
			<HeaderBlock 
				title="Нам нравится это"
				hideBackground
				descr="Воспользуйтесь карточками для запоминания и пополнения активных словарных запасов"
				background="black"
			/>
			<HeaderBlock 
				title="ЭЭЭЭ"
				descr="запасов"
				background="red"
				hideBackground
			/>
			<ContentBlock
				title = "Hello"
				descr = "world"
				background = "#9a9a9a"
			/>
			<ContentBlock
				title = "Goodbye"
				descr = "world"
				background = "#9a99a9"
			/>
			<FooterBlock
				userName = "Кирилл"
			/>
			<FooterBlock />
		</>
	);
}

export default App;
