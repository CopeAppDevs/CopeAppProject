package com.copeapp.dto.appunti;

import lombok.Data;
import lombok.NonNull;

@Data
public class AppuntoResponseByIdDTO {

	@NonNull
	private AppuntoDTO appuntoDTO;
	
	private boolean hasVotedLike;
	
	private boolean hasVotedDislike;
}
