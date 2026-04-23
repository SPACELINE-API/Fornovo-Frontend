import FormLogin from './formLogin';
import style from './loginLyt.module.css';
import ImgCircle from '../../../assets/imagens/imgCircle.svg';

export default function LoginLayout() {
  return (
    <div className={style.loginLayout}>
      <div className={style.loginLeft}>
        <div className={style.circleMask}>
          <img src={ImgCircle} className={style.imgSvg} alt="padrão neon" />
        </div>
        <div className={style.loginLeftCircleSmall} />
        <div className={style.loginLeftCircleBottomRight} />

        <div className={style.loginLeftContent}>
          <h1 className={style.loginLeftTitle}>FORNOVO.</h1>
          <p className={style.loginLeftSubtitle}>
            UMA PLATAFORMA PARA POUPAR O SEU TEMPO
          </p>
        </div>
      </div>

      <div className={style.loginRight}>
        <FormLogin />
      </div>
      <div className={style.loginCircleRight} />
    </div>
  );
}
