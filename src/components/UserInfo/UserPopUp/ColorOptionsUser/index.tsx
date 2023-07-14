import React, { useState, useRef, useEffect } from 'react';
import styles from './ColorOptionsUser.module.scss';

const optionsColor = ['#8E4EF5', '#FF69B4', '#FFA500', '#00CED1', '#FF6347', '#32CD32'];
export default function ColorOptionsUser({
    selectColors,
    value
}: {
    selectColors: (values: { perfil: string; banner: string}) => void;
    value: {perfil: string, banner: string}
}) {
    const [select, setSelect] = useState<{
        perfil: string;
        banner: string;
    }>({
        perfil: value.perfil,
        banner: value.banner,
    });

    const bannerRefs = useRef<(HTMLInputElement | null)[]>([]);
    const perfilRefs = useRef<(HTMLInputElement | null)[]>([]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setSelect((prev) => ({ ...prev, [name]: value }));
    }

    function handleBannerClick(index: number) {
        if (bannerRefs.current[index]) {
            bannerRefs.current[index]!.checked = true;
            setSelect((prev) => ({ ...prev, banner: optionsColor[index] }));
        }
    }

    function handlePerfilClick(index: number) {
        if (perfilRefs.current[index]) {
            perfilRefs.current[index]!.checked = true;
            setSelect((prev) => ({ ...prev, perfil: optionsColor[index] }));
        }
    }

    useEffect(() => {
        if (selectColors) {
            selectColors(select);
        }
    }, [select, selectColors]);

    return (
        <>
            <div className={styles.colorOptions}>
                <span className={styles.title}>Banner Color Options</span>
                <div className={styles.options}>
                    {optionsColor.map((color, index) => {
                        return (
                            <div key={index} className={styles.fundoColor} style={select.banner === color ? { border: `.2rem solid ${color}` } : {}} onClick={() => handleBannerClick(index)}>
                                <div className={styles.color} style={select.banner === color ? { backgroundColor: color } : { backgroundColor: color, opacity: '0.5'}}></div>
                                <input type={"radio"} id={color} onChange={handleChange} name={"banner"} style={{ visibility: 'hidden', position: 'absolute' }} ref={(ref) => (bannerRefs.current[index] = ref)} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.colorOptions}>
                <span className={styles.title}>Perfil Color Options</span>
                <div className={styles.options}>
                    {optionsColor.map((color, index) => {
                        return (
                            <div key={index} className={styles.fundoColor} style={select.perfil === color ? { border: `.2rem solid ${color}` } : {}} onClick={() => handlePerfilClick(index)}>
                                <div className={styles.color} style={select.perfil === color ? { backgroundColor: color } : { backgroundColor: color, opacity: '0.5'}}></div>
                                <input type="radio" id={color} onChange={handleChange} name="perfil" style={{ visibility: 'hidden', position: 'absolute' }} ref={(ref) => (perfilRefs.current[index] = ref)} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
