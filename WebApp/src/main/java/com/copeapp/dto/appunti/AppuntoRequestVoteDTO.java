package com.copeapp.dto.appunti;

import lombok.Data;
import lombok.NonNull;

@Data
public class AppuntoRequestVoteDTO {
	
	@NonNull
	private Integer appuntoId;
	
	private boolean vote;
}
