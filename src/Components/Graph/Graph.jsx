import { replace, useNavigate } from 'react-router-dom';
import { checkToken, getUser, checkPoint, getPoints, deletePoints } from '../../Requests/requestService';
import { useEffect, useState } from 'react';
import Canvas from "../Canvas/Canvas"
import style from "./graph.module.css"
import ResultForm from '../ResultForm/ResultForm';
import ResultTable from '../ResultTable/ResultTable';

export default function Graph() {

  const navigate = useNavigate();

	async function checkIfAuthentificated() {
		const isAuthentificated = await checkToken();
		if (!isAuthentificated) {
			navigate('/');
		}
	}

	checkIfAuthentificated();

	const [user, setUser] = useState(null);
	const [points, setPoints] = useState(null);
	const [radius, setRadius] = useState(1);

	async function fetchUser() {
		setUser(await getUser());
	}

	async function fetchPoints() {
		setPoints(await getPoints());
	}

	async function handleDelete() {
		await deletePoints();
		fetchPoints();
	}

	async function handleResultForm(data) {
		const pointData = await checkPoint(data);
		await fetchPoints();
	}


	useEffect(() => {
		fetchUser();
		fetchPoints();
	}, []);

  return (
		<div className={style.wrapper}>
			<Label user={user}/>
			<div className={style.subject_container}>
				<div className={style.block} style={{ position: "relative" }}>
					<p className={style.title}>Координатная плоскость</p>
					<Canvas radius={radius} points={points} handleClick={handleResultForm}/>
				</div>
				<div className={style.block} style={{ position: "relative" }}>
					<p className={style.title}>Форма запроса</p>
					<ResultForm radiusStateFunc={setRadius} radius={radius} formHandle={handleResultForm} deleteHandle={handleDelete}/>
				</div>
				<div className={style.block} style={{ position: "relative" }}>
					<p className={style.title}>Таблица результатов</p>
					<ResultTable points={points}/>
				</div>
			</div>
		</div>
  );
}

function Label({ user }) {
	return (
			<div className={style.label_wrapper}>
					<p className={style.title}>ASSIGNMENT 4 WEB</p>
					<p className={style.subtitle}>{user ? user.username + " (" + user.id + ")"  : 'User fetch...'}</p>
			</div>
	);
}