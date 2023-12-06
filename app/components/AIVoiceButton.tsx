import React, { useRef } from "react";
import { Button, Icon, makeStyles } from "@rneui/themed";
import Draggable, { DraggableRef } from "app/components/Draggable";
import { sendTest } from "app/utils/AIVoiceAssistant";

const AIVoiceButton = () => {
    const ref = useRef<DraggableRef>(null);
    const styles = useStyles();
    return (
        <Draggable
            z={99}
            ref={ref}
            onDragRelease={(event, gestureState) => {
                // ref.current?.setPosition(0, 0);
            }}
        >
            <Button
                buttonStyle={styles.button}
                type={"clear"}
                icon={
                    <Icon
                        name={"microphone"}
                        size={32}
                        type={"font-awesome"}
                        iconStyle={styles.icon}
                    />
                }
                onPress={() => {
                    console.log("sendText");
                    sendTest();
                }}
            />
        </Draggable>
    );
};

const useStyles = makeStyles((theme) => ({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
    },
    icon: {
        color: theme.colors.white,
    },
}));

export default AIVoiceButton;
