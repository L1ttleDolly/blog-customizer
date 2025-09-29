import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import React, { useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useFormOutsideClickClose } from 'src/ui/select/hooks/useFormOutsideClickClose';

export type TFormValue = {
	fontFamily: OptionType;
	fontColor: OptionType;
	fontSize: OptionType;
	bgColor: OptionType;
	contentWidth: OptionType;
};

export type TArticleParamsFormProps = {
	articleChange: (value: TFormValue) => void;
	onClose?: () => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const defaultValues = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		fontSize: defaultArticleState.fontSizeOption,
		bgColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	};

	const [isOpen, setModal] = useState<boolean>(false);

	const [value, setValue] = useState<TFormValue>(defaultValues);
	const rootRef = useRef<HTMLFormElement>(null);

	const { articleChange, onClose } = props;

	useFormOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setModal,
	});

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		articleChange(value);
	}

	function handleClickModal() {
		setModal((prev) => !prev);
	}

	function handleReset() {
		articleChange(defaultValues);
		setValue(defaultValues);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClickModal} />
			<aside
				className={
					!isOpen
						? `${styles.container}`
						: `${styles.container} ${styles.container_open}`
				}>
				<form
					ref={rootRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={value.fontFamily}
						title='ШРИФТ У БУКВ'
						options={fontFamilyOptions}
						onChange={(option) =>
							setValue((prev) => ({ ...prev, fontFamily: option }))
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={value.fontSize}
						title='РАЗМЕР БУКВ'
						onChange={(option) =>
							setValue((prev) => ({ ...prev, fontSize: option }))
						}
					/>
					<Select
						selected={value.fontColor}
						title='ЦВЕТ БУКВ'
						options={fontColors}
						onChange={(option) =>
							setValue((prev) => ({ ...prev, fontColor: option }))
						}
					/>
					<Separator />
					<Select
						selected={value.bgColor}
						title='ЦВЕТ СТРOНИЧКИ'
						options={backgroundColors}
						onChange={(option) =>
							setValue((prev) => ({ ...prev, bgColor: option }))
						}
					/>

					<Select
						selected={value.contentWidth}
						title='ШИРОКИЙ\УЗКИЙ'
						options={contentWidthArr}
						onChange={(option) =>
							setValue((prev) => ({ ...prev, contentWidth: option }))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
