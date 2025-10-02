interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
    confirmText?: string;
    cancelText?: string;
}

function ConfirmationModal({
    isOpen,
    title,
    message,
    onConfirm,
    onClose,
    confirmText = 'Подтвердить',
    cancelText = 'Отмена'
}: ConfirmationModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        // Оверлей (затемнение фона)
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} // Закрытие по клику на фон
        >
            {/* Контейнер модального окна */}
            <div 
                className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-xl w-full max-w-md border border-light-border dark:border-dark-border"
                onClick={e => e.stopPropagation()} // Остановка всплытия, чтобы клик по окну не закрывал его
            >
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="secondary-button">
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} className="danger-button">
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;